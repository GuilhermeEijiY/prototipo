import { useState } from "react"
import axios from "axios"
import Button from "../../components/Button/Button"
import InputField from "../../components/InputField/InputField"
import styles from "./SimulationPage.module.css"

const initialForm = {
  valor_imovel: "",
  valor_entrada: "",
  prazo_meses: "",
  taxa_juros_anual: "",
  taxa_adm_total: "",
}

function SimulationPage() {
  const [formData, setFormData] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function formatMoney(value) {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError("")
    setResult(null)

    try {
      const payload = {
        valor_imovel: Number(formData.valor_imovel),
        valor_entrada: Number(formData.valor_entrada),
        prazo_meses: Number(formData.prazo_meses),
        taxa_juros_anual: Number(formData.taxa_juros_anual),
        taxa_adm_total: Number(formData.taxa_adm_total),
      }

      const response = await axios.post("http://localhost:3000/api/simulate", payload)
      setResult(response.data)
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        "Nao foi possivel simular agora. Verifique se a API esta ativa."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Simulacao CasaCerta</h1>
        <p className={styles.subtitle}>
          Preencha os dados abaixo para comparar financiamento e consorcio.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <InputField
            id="valor_imovel"
            name="valor_imovel"
            label="Valor do Imovel (R$)"
            placeholder="Ex: 350000"
            value={formData.valor_imovel}
            onChange={handleChange}
            min="0"
          />

          <InputField
            id="valor_entrada"
            name="valor_entrada"
            label="Valor de Entrada (R$)"
            placeholder="Ex: 50000"
            value={formData.valor_entrada}
            onChange={handleChange}
            min="0"
          />

          <InputField
            id="prazo_meses"
            name="prazo_meses"
            label="Prazo (em meses)"
            placeholder="Ex: 240"
            value={formData.prazo_meses}
            onChange={handleChange}
            min="1"
            step="1"
          />

          <InputField
            id="taxa_juros_anual"
            name="taxa_juros_anual"
            label="Taxa de Juros Anual (%)"
            placeholder="Ex: 11.5"
            value={formData.taxa_juros_anual}
            onChange={handleChange}
            min="0"
          />

          <InputField
            id="taxa_adm_total"
            name="taxa_adm_total"
            label="Taxa de Administracao (%)"
            placeholder="Ex: 18"
            value={formData.taxa_adm_total}
            onChange={handleChange}
            min="0"
          />

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Simulando..." : "Simular e Comparar"}
          </Button>
        </form>

        {error ? <p className={styles.errorMessage}>{error}</p> : null}

        {result ? (
          <section className={styles.resultsSection}>
            <h2 className={styles.resultsTitle}>Resultados</h2>
            <div className={styles.resultsGrid}>
              <article className={styles.resultCard}>
                <h3 className={styles.resultCardTitle}>Financiamento</h3>
                <p>
                  1ª parcela: <strong>{formatMoney(result.financiamento.primeira_parcela)}</strong>
                </p>
                <p>
                  Última parcela:{" "}
                  <strong>{formatMoney(result.financiamento.ultima_parcela)}</strong>
                </p>
                <p>
                  Custo total: <strong>{formatMoney(result.financiamento.custo_total)}</strong>
                </p>
              </article>

              <article className={styles.resultCard}>
                <h3 className={styles.resultCardTitle}>Consórcio</h3>
                <p>
                  Parcela fixa: <strong>{formatMoney(result.consorcio.parcela_mensal)}</strong>
                </p>
                <p>
                  Custo total: <strong>{formatMoney(result.consorcio.custo_total)}</strong>
                </p>
              </article>
            </div>
          </section>
        ) : null}
      </div>
    </section>
  )
}

export default SimulationPage
