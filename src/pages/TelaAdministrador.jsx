import {
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import MenuComunicador from "../components/MenuComunicador.jsx";
import MenuLateral from "../components/MenuLateral.jsx";

import AdicionarBotao from "./AdicionarBotão.jsx";
import EditarCategoria from "./EditarCategoria.jsx";
import Relatorio from "./Relatorio.jsx";
import EditarPerfil from "./EditarPerfil.jsx";
import EdicaoUsuario from "./EdicaoUsuario.jsx";

import "./TelaAdministrador.css";

const SECOES = {
  perfil: EditarPerfil,
  usuario: EdicaoUsuario,
  botoes: AdicionarBotao,
  categorias: EditarCategoria,
  relatorios: Relatorio,
};

function TelaAdministrador({
  secaoInicial = "relatorios",
}) {
  const navigate = useNavigate();

  const secaoInicialValida =
    SECOES[secaoInicial]
      ? secaoInicial
      : "relatorios";

  const [secao, setSecao] =
    useState(secaoInicialValida);

  const administrador =
    useMemo(() => {
      try {
        const administradorSalvo =
          localStorage.getItem(
            "administrador"
          );

        return administradorSalvo
          ? JSON.parse(
            administradorSalvo
          )
          : null;
      } catch (erroLeitura) {
        console.error(
          "Não foi possível ler o administrador salvo:",
          erroLeitura
        );

        return null;
      }
    }, []);

  const Conteudo =
    SECOES[secao] || Relatorio;

  const selecionarSecao = (
    novaSecao
  ) => {
    if (!SECOES[novaSecao]) {
      return;
    }

    setSecao(novaSecao);
  };

  const alterarModo = (
    novoModo
  ) => {
    if (
      novoModo === "comunicacao"
    ) {
      navigate("/comunicador", {
        replace: true,
      });
    }
  };

  const sair = () => {
    localStorage.removeItem("token");
    localStorage.removeItem(
      "idUsuario"
    );
    localStorage.removeItem(
      "usuario"
    );
    localStorage.removeItem(
      "administrador"
    );

    navigate("/", {
      replace: true,
    });
  };

  return (
    <div className="tela-administrador">
      <MenuComunicador
        modo="edicao"
        onChangeModo={alterarModo}
        nomeUsuario={
          administrador?.nome?.trim() ||
          "Administrador"
        }
        onSair={sair}
      />
      <div
        className="tela-administrador__separador"
        aria-hidden="true"
      />

      <div className="tela-administrador__estrutura">
        <MenuLateral
          secaoAtiva={secao}
          onSelecionar={
            selecionarSecao
          }
        />

        <main className="tela-administrador__conteudo">
          <Conteudo />
        </main>
      </div>
    </div>
  );
}

export default TelaAdministrador;
