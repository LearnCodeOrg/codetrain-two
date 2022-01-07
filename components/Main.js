import styles from '../styles/components/Main.module.css';

export default function Main(props) {
  const { Component, pageProps } = props;

  return (
    <Component {...pageProps} />
  );
}
