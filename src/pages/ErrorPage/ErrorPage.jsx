import styles from '../ErrorPage/ErrorPage.module.css'
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();

    return(
        <div className={styles.container}>
            <h1 className={styles.error_code}>{error.status}</h1>
            <p>{error.statusText}</p>
        </div>
    )
}

export default ErrorPage;