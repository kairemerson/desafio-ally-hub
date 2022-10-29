import styles from "./info.module.css"

export default props=>{

    const {name, email, phone, cpf, country, city} = props.data
    return(
        <div className={styles.wrapper}>
            <button className={styles.close} onClick={()=>props.close()}>X</button>
            <h2>Dados informados</h2>
            <h3 className={styles.title}>Nome</h3>
            <p className={styles.text}>{name}</p>
            <h3 className={styles.title}>Email</h3>
            <p className={styles.text}>{email}</p>
            <h3 className={styles.title}>Telefone</h3>
            <p className={styles.text}>{phone}</p>
            <h3 className={styles.title}>CPF</h3>
            <p className={styles.text}>{cpf}</p>
            <h3 className={styles.title}>País</h3>
            {country?.map((item, i)=>(
                <p key={i} className={styles.text}>{item}</p>
            ))}
            <h3 className={styles.title}>Cidade</h3>
            {city?.map((item, i)=>(
                <p key={i} className={styles.text}>{item}</p>
            ))}
        </div>
    )
}