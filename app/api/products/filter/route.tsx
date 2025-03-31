// app/api/products/filter/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export async function GET(request: Request): Promise<Response> {
  try {
    // Connect to database
    await dbConnect();
    
    // Get URL and extract search params
    const { searchParams } = new URL(request.url);
    
    // Extract filter parameters
    const search: string | null = searchParams.get('search');
    const minPrice: string | null = searchParams.get('minPrice');
    const maxPrice: string | null = searchParams.get('maxPrice');
    const location: string | null = searchParams.get('location');
    const brand: string | null = searchParams.get('brand');
    const listingType: string | null = searchParams.get('listingType');
    const sortBy: string | null = searchParams.get('sortBy');
    const page: number = Number(searchParams.get('page') || 1);
    const limit: number = Number(searchParams.get('limit') || 10);
    
    // Build filter query
    const query: Record<string, any> = {};
    
    // Text search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    // Location
    if (location) {
      query['location.county'] = location;
    }
    
    // Brand
    if (brand) {
      query.brand = brand;
    }
    
    // Listing type
    if (listingType) {
      query.listingType = listingType;
    }
    
    // Sort order
    let sort: Record<string, 1 | -1> = {};
    switch (sortBy) {
      case 'price_asc':
        sort = { price: 1 };
        break;
      case 'price_desc':
        sort = { price: -1 };
        break;
      case 'newest':
        sort = { createdAt: -1 };
        break;
      case 'popular':
        sort = { views: -1 };
        break;
      default:
        sort = { createdAt: -1 }; // Default to newest
    }
    
    // Calculate pagination
    const skip: number = (page - 1) * limit;
    
    // Execute query
    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const total: number = await Product.countDocuments(query);
    
    // Return results
    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}