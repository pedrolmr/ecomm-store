import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Product.module.css';

import products from '../../products.json';
import { useCart } from '../../hooks/use-cart';

export default function Product({ product }) {
  console.log("product:", product)

  const {id, title, description, image, price} = product;

  const { addToCart } = useCart()
  return (
    <div className={styles.container}>
      {/* <Head>
        <title>{ title } - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <main className={styles.main}>
        <div className={styles.productImage}>
          <Image width={500} height={500} src={image} alt={title}></Image>
        </div>

        <div>
          <h1>
            { title }
          </h1>

          <p className={styles.description}>
            { description }
          </p>

          <p className={styles.description}>
            ${ price.toFixed(2) }
          </p>

          <p>
            <button className={styles.button} onClick={() => addToCart({ id })}>
              Buy
            </button>
          </p>
        </div>

      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" className={styles.logo}></Image>
        </a>
      </footer> */}
    </div>
  )
}
export async function getStaticProps({ params}){
  const product = products.find(({ id }) => `${id}` === `${params.productId}`)
  return {
    props: {
      product
    }
  }
}
export async function getStaticPaths(){
  const paths = products.map(product => {
    const {id} = product
    return {
      params:{
        productId: id
      }
    }
  })
  return {
    paths,
    fallback: false
  }
}