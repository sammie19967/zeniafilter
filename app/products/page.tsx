// app/products/page.js
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductFilters from '@/components/ProductFilters';
import ProductCard from '@/components/ProductCard';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0
  });
  
  // Fetch products when searchParams change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Get current page from URL or default to 1
        const page = searchParams.get('page') || 1;
        
        // Create request URL with all search params
        const apiUrl = `/api/products/filter?${searchParams.toString()}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data.products);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [searchParams]);
  
  // Handle pagination
  const handlePageChange = (newPage) => {
    // Create new URLSearchParams from current
    const params = new URLSearchParams(searchParams.toString());
    
    // Update page parameter
    params.set('page', newPage);
    
    // Navigate with updated params
    router.push(`/products?${params.toString()}`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="md:w-1/4">
          <ProductFilters />
        </div>
        
        {/* Products Grid */}
        <div className="md:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
              <p className="text-center text-yellow-800">
                No products found matching your criteria. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              {/* Simple Pagination */}
              {pagination.pages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  
                  <span className="px-4 py-2">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}