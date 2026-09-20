import {
  ImageOff,
  PackageSearch,
  Search,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import type { Product } from "../../../types/product";

import { EmptyState } from "../../../shared/components/EmptyState";

interface PosProductGridProps {
  products: Product[];

  onAddProduct: (
    product: Product
  ) => void;
}

const API_ORIGIN = "http://localhost:8083";

export function PosProductGrid({
  products,
  onAddProduct,
}: PosProductGridProps) {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("ALL");

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        products
          .map((product) =>
            product.categoryName?.trim()
          )
          .filter(
            (category): category is string =>
              Boolean(category)
          )
      )
    ).sort((a, b) =>
      a.localeCompare(b)
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "ALL" ||
        product.categoryName ===
          selectedCategory;

      const matchesSearch =
        normalizedSearch === "" ||
        product.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        product.categoryName
          ?.toLowerCase()
          .includes(normalizedSearch);

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [
    products,
    searchTerm,
    selectedCategory,
  ]);

  if (products.length === 0) {
    return (
      <EmptyState
        title="No active products found"
        description="Active products will appear here and can be added to the current order."
        icon={<PackageSearch size={22} />}
      />
    );
  }

  return (
    <div className="pos-catalog">
      {/* SEARCH */}
      <div className="pos-catalog-toolbar">
        <div className="pos-product-search">
          <Search size={18} />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
            placeholder="Search products..."
          />
        </div>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="pos-category-filters">
        <button
          type="button"
          className={
            selectedCategory === "ALL"
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedCategory("ALL")
          }
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={
              selectedCategory === category
                ? "active"
                : ""
            }
            onClick={() =>
              setSelectedCategory(
                category
              )
            }
          >
            {category}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      {filteredProducts.length === 0 ? (
        <div className="pos-no-results">
          <PackageSearch size={28} />

          <strong>
            No products found
          </strong>

          <span>
            Try another product name or
            category.
          </span>
        </div>
      ) : (
        <div className="pos-product-grid">
          {filteredProducts.map(
            (product) => {
              const outOfStock =
                product.stockQuantity <= 0;

              const imageSrc =
                product.imageUrl
                  ? `${API_ORIGIN}${product.imageUrl}`
                  : null;

              return (
                <button
                  key={product.id}
                  type="button"
                  className="pos-product-card"
                  disabled={outOfStock}
                  onClick={() =>
                    onAddProduct(product)
                  }
                >
                  <div className="pos-product-card__image">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={product.name}
                      />
                    ) : (
                      <div className="pos-product-card__image-placeholder">
                        <ImageOff
                          size={25}
                        />
                      </div>
                    )}
                  </div>

                  <div className="pos-product-card__body">
                    <div className="pos-product-card__header">
                      <strong>
                        {product.name}
                      </strong>

                      <span
                        className={
                          outOfStock
                            ? "pos-stock pos-stock--empty"
                            : product.stockQuantity <=
                                product.stockAlertThreshold
                              ? "pos-stock pos-stock--low"
                              : "pos-stock"
                        }
                      >
                        {outOfStock
                          ? "Out"
                          : `${product.stockQuantity} in stock`}
                      </span>
                    </div>

                    <p>
                      {product.categoryName ||
                        "Uncategorized"}
                    </p>

                    <div className="pos-product-card__footer">
                      <b>
                        {Number(
                          product.price
                        ).toFixed(2)}{" "}
                        MAD
                      </b>

                      <span>
                        + Add
                      </span>
                    </div>
                  </div>
                </button>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}