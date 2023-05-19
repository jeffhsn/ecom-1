// import bcrypt from 'bcryptjs';

import ProductItem from '@/src/components/ProductItem';
import data from '@/src/utils/data';

const HomePage = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {data.products.map((product) => (
        <ProductItem product={product} key={product.slug} />
      ))}
    </div>
  );
};

export default HomePage;
