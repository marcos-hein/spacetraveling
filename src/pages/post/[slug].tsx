import { GetStaticPaths, GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { format } from 'date-fns';

import { ptBR } from 'date-fns/locale';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Comments from '../../components/Comments';
import { PreviewButton } from '../../components/PreviewButton';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
  preview: boolean;
}

export default function Post({ post, preview }: PostProps): JSX.Element {
  const router = useRouter();

  if (router.isFallback) return <div>Carregando...</div>;

  const amountOfWords = post.data.content.reduce(
    (arr, data) => [
      ...arr,
      ...data.heading.split(' '),
      ...RichText.asText(data.body).split(' '),
    ],
    []
  ).length;
  const wordsPerMinute = 200;
  const estimatedTime = Math.ceil(amountOfWords / wordsPerMinute);

  return (
    <>
      <Head>
        <title>{post.data.title} | spacatraveling</title>
      </Head>

      <Header />

      <img className={styles.banner} src={post.data.banner.url} alt="Banner" />

      <main className={commonStyles.container}>
        <article className={styles.post}>
          <h1>{post.data.title}</h1>
          <div className={styles.postInfo}>
            <span>
              <FiCalendar />
              {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
                locale: ptBR,
              })}
            </span>
            <span>
              <FiUser />
              {post.data.author}
            </span>
            <span>
              <FiClock />
              {`${estimatedTime} min`}
            </span>
          </div>
          <div className={styles.postContent}>
            {post.data.content.map(({ heading, body }) => (
              <div key={heading}>
                <h2>{heading}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: RichText.asHtml(body) }}
                />
              </div>
            ))}
          </div>
        </article>

        <Comments />

        {preview && <PreviewButton />}
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.Predicates.at('document.type', 'posts')],
    {
      pageSize: 4,
    }
  );

  const paths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const prismic = getPrismicClient();
  const { slug } = params;
  const response = await prismic.getByUID('posts', String(slug), {
    ref: previewData?.ref ?? null,
  });

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content,
    },
  };

  return {
    props: {
      post,
      preview,
    },
  };
};
