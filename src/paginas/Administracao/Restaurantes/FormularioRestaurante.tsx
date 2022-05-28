import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Box } from "@mui/system";
import http from "../../../http";

const FormularioRestaurante = () => {
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`
        )
        .then((resposta) => setNomeRestaurante(resposta.data.nome));
    }
  }, [parametros]);

  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante atualizado com sucesso!");
        });
    } else {
      http.post("restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante cadastrado com sucesso!");
        });
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box component="form" onSubmit={aoSubmeterForm}>
        <Typography component="h1" variant="h6">
          Formulário de Restaurantes
        </Typography>
        <TextField
          value={nomeRestaurante}
          onChange={(evento) => setNomeRestaurante(evento.target.value)}
          label="Nome do Restaurante"
          variant="standard"
          required
          fullWidth
        />
        <Button
          sx={{ marginTop: 2 }}
          type="submit"
          fullWidth
          variant="outlined"
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioRestaurante;
