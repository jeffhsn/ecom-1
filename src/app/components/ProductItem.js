import Link from 'next/link';

const ProductItem = ({ product }) => {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow object-cover h-64 w-full"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2>{product.name}</h2>
        </Link>
        <p className="mb-2">{product.name}</p>
        <p>${product.price}</p>
        <button
          className="primary-button hover:bg-amber-400 active:bg-amber-500"
          type="button"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
