// components/ProductFilters.jsx
"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Filters {
  search: string;
  minPrice: string;
  maxPrice: string;
  location: string;
  brand: string;
  listingType: string;
  sortBy: string;
}

const ProductFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>({
    search: '',
    minPrice: '',
    maxPrice: '',
    location: '',
    brand: '',
    listingType: '',
    sortBy: 'newest',
  });

  // Sample location options
  const locations: string[] = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'];

  // Sample brand options
  const brands: string[] = ['Samsung', 'Apple', 'Toyota', 'Honda'];

  // Load filters from URL on component mount
  useEffect(() => {
    setFilters({
      search: searchParams.get('search') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      location: searchParams.get('location') || '',
      brand: searchParams.get('brand') || '',
      listingType: searchParams.get('listingType') || '',
      sortBy: searchParams.get('sortBy') || 'newest',
    });
  }, [searchParams]);

  // Handle filter changes
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    // Create new URLSearchParams
    const params = new URLSearchParams();

    // Add non-empty filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    // Navigate with the updated query
    router.push(`/products?${params.toString()}`);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      search: '',
      minPrice: '',
      maxPrice: '',
      location: '',
      brand: '',
      listingType: '',
      sortBy: 'newest',
    });

    router.push('/products');
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          name="search"
          placeholder="Search products..."
          value={filters.search}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Price Range</h3>
        <div className="flex space-x-2">
          <input
            type="number"
            name="minPrice"
            placeholder="Min"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="w-1/2 p-2 border rounded"
          />
        </div>
      </div>

      {/* Location */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Location</h3>
        <select
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Brand</h3>
        <select
          name="brand"
          value={filters.brand}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Listing Type */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Listing Type</h3>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="listingType"
              value="sale"
              checked={filters.listingType === 'sale'}
              onChange={handleFilterChange}
              className="mr-2"
            />
            For Sale
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="listingType"
              value="hire"
              checked={filters.listingType === 'hire'}
              onChange={handleFilterChange}
              className="mr-2"
            />
            For Hire
          </label>
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Sort By</h3>
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="newest">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={applyFilters}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;