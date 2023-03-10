import styles from '@/styles/Home.module.css'
import ToDoPage from './todo/index'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Todo app</title>
      </Head>
      <main className={styles.main}>
        <ToDoPage/>
      <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
       <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css"
    />
      </main>
    </>
  )
}
