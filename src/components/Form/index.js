import styles from "./form.module.css"
import api from "../../services/api"
import { useEffect, useState } from "react"

import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"

export default props =>{

    const [countries, setCountries] = useState([])
    const [cities, setCities] = useState([])

    const validationSchema = yup.object({
        name: yup.string().required("O campo nome é obrigatório"),
        email: yup.string().email().required("O campo email é obrigatório"),
        phone: yup.string().required("O campo telefone é obrigatório"),
        cpf: yup.string().required("O campo CPF é obrigatório"),
        country: yup.array().min(1, "Deve ser escolhido pelo menos um país"),
        city: yup.array().min(1, "Deve ser escolhido pelo menos uma cidade")
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = (data) =>{
        console.log(data)
    }

    const getCountries = () =>{
        api.get("/country")
            .then(resp => setCountries(resp.data))
    }

    const getCities = () =>{
        api.get("/city")
            .then(resp => setCities(resp.data))
    }

    useEffect(()=>{
        getCountries()
        getCities()
    },[])
    
    return(
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.wrapper}>
                <div className={styles.formWrapper}>
                    <h2 className={styles.title}>Dados Pessoais</h2>
                        <div className={styles.formGroup}>
                            <label className={styles.labelGroup}>*Nome: </label>
                            <input className={styles.inputGroup} type="text" name="name" {...register("nome")}/>
                            <p className={styles.errorMessage}>{errors.name?.message}</p>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.labelGroup}>*Email: </label>
                            <input className={styles.inputGroup} type="text" name="email" {...register("email")}/>
                            <p className={styles.errorMessage}>{errors.email?.message}</p>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.labelGroup}>*Telefone: </label>
                            <input className={styles.inputGroup} type="text" name="phone" {...register("telefone")}/>
                            <p className={styles.errorMessage}>{errors.phone?.message}</p>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.labelGroup}>*CPF: </label>
                            <input className={styles.inputGroup} type="text" name="cpf" {...register("cpf")}/>
                            <p className={styles.errorMessage}>{errors.cpf?.message}</p>
                        </div>
                </div>
                <div className={styles.formWrapper}>
                    <h2 className={styles.title}>Destinos de Interesse</h2>
                    <p>Segure ctrl para selecionar mais de uma opção.</p>
                        <div className={styles.formGroup}>
                            <label className={styles.labelGroup}>*País: </label>
                            <select className={styles.selectGroup} multiple {...register("country")}>
                                {countries.map((country)=>(
                                    <option key={country.code} value={country.name}>{country.name_ptbr}</option>
                                    ))}
                            </select>
                            <p className={styles.errorMessage}>{errors.country?.message}</p>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.labelGroup}>*Cidade: </label>
                            <select className={styles.selectGroup} {...register("city")} multiple>
                                {cities.map((city)=>(
                                    <option key={city.id} value={city.name}>{city.name_ptbr}</option>
                                ))}
                            </select>
                            <p className={styles.errorMessage}>{errors.city?.message}</p>
                        </div>
                </div>
            </div>
            <button className={styles.send} type="submit">Enviar</button>
        </form>
    )
}