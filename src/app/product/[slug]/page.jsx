'use client';

import Link from 'next/link';
import Image from 'next/image';
import data from '@/src/utils/data';
import { useContext } from 'react';
import { Store } from '@/src/utils/Store';
import { toast } from 'react-toastify';

const ProductPage = ({ params }) => {
  const { state, dispatch } = useContext(Store);
  const { slug } = params;
  const product = data.products.find(
    (product) => product.slug === slug
  );
  if (!product) {
    return <h1>Product not found</h1>;
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
  };

  return (
    <>
      <div className="py-2">
        <Link href="/">back to product</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>{product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>
                {product.countInStock > 0
                  ? 'In stock'
                  : 'Unavailable'}
              </div>
            </div>
            <button
              className="primary-button w-full hover:bg-amber-400 active:bg-amber-500"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
