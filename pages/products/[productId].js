import Head from 'next/head'
import styles from '../../styles/Product.module.css'

import products from '../../products.json'

export default function Product({ product }) {
  console.log("product:", product)

  const id = 'productId';
  const title = 'Product Title';
  const description = 'Product description';
  const image = 'https://source.unsplash.com/random/500x500';
  const price = 1.00;

  return (
    <div className={styles.container}>
      <Head>
        <title>{ title } - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.productImage}>
          <img src={image} alt={title} />
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
            <button className={styles.button}>
              Buy
            </button>
          </p>
        </div>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
export async function getStaticProps({ params }){
  const product = products.map(({id}) => id === params.productId)
  return {
    props:{
      product
    }
  }
}
export async function getStaticPaths(){
  const paths = products.map(product => {
    return {
      params:{
        productId: product.id
      }
    }
  })
  return {
    paths,
    fallback: false
  }
}