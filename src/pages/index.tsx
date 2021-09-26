import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>
      <main className={styles.container}>
        <section className={styles.posts}>
          <Link href="/">
            <a>
              <strong>Como utilizar Hooks</strong>
              <p>Pensando em sincronização em vez de ciclos de vida</p>
              <div>
                <span>
                  <FiCalendar />
                  19 set 21
                </span>
                <span>
                  <FiUser />
                  Autor
                </span>
              </div>
            </a>
          </Link>

          <Link href="/">
            <a>
              <strong>Como utilizar Hooks</strong>
              <p>Pensando em sincronização em vez de ciclos de vida</p>
              <div>
                <span>
                  <FiCalendar />
                  19 set 21
                </span>
                <span>
                  <FiUser />
                  Autor
                </span>
              </div>
            </a>
          </Link>

          <Link href="/">
            <a>
              <strong>Como utilizar Hooks</strong>
              <p>Pensando em sincronização em vez de ciclos de vida</p>
              <div>
                <span>
                  <FiCalendar />
                  19 set 21
                </span>
                <span>
                  <FiUser />
                  Autor
                </span>
              </div>
            </a>
          </Link>

          <Link href="/">
            <a>
              <strong>Como utilizar Hooks</strong>
              <p>Pensando em sincronização em vez de ciclos de vida</p>
              <div>
                <span>
                  <FiCalendar />
                  19 set 21
                </span>
                <span>
                  <FiUser />
                  Autor
                </span>
              </div>
            </a>
          </Link>

          <Link href="/">
            <a>
              <strong>Como utilizar Hooks</strong>
              <p>Pensando em sincronização em vez de ciclos de vida</p>
              <div>
                <span>
                  <FiCalendar />
                  19 set 21
                </span>
                <span>
                  <FiUser />
                  Autor
                </span>
              </div>
            </a>
          </Link>
          <button className={styles.button} type="button">
            Carregar mais posts
          </button>
        </section>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
