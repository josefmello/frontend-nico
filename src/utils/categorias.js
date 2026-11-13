export function filtrarCategoriasResolvidas(
  dadosCategorias
) {
  const categoriasRecebidas =
    Array.isArray(
      dadosCategorias
    )
      ? dadosCategorias
      : [];

  const categoriasVisiveis =
    categoriasRecebidas.filter(
      (categoria) =>
        !categoria.oculto
    );

  const categoriasPorNome =
    new Map();

  categoriasVisiveis.forEach(
    (categoria) => {
      const chaveNome =
        String(
          categoria.nome || ""
        )
          .normalize("NFD")
          .replace(
            /[\u0300-\u036f]/g,
            ""
          )
          .toLowerCase()
          .trim();

      if (!chaveNome) {
        return;
      }

      const existente =
        categoriasPorNome.get(
          chaveNome
        );

      if (!existente) {
        categoriasPorNome.set(
          chaveNome,
          categoria
        );

        return;
      }

      const categoriaEhExclusiva =
        Boolean(
          categoria.exclusivaUsuario
        );

      const existenteEhExclusiva =
        Boolean(
          existente.exclusivaUsuario
        );

      if (
        categoriaEhExclusiva &&
        !existenteEhExclusiva
      ) {
        categoriasPorNome.set(
          chaveNome,
          categoria
        );

        return;
      }

      const categoriaEhPersonalizada =
        Boolean(
          categoria.personalizada
        );

      const existenteEhPersonalizada =
        Boolean(
          existente.personalizada
        );

      if (
        categoriaEhPersonalizada &&
        !existenteEhPersonalizada &&
        !existenteEhExclusiva
      ) {
        categoriasPorNome.set(
          chaveNome,
          categoria
        );
      }
    }
  );

  return Array.from(
    categoriasPorNome.values()
  ).sort(
    (
      primeira,
      segunda
    ) => {
      const posicaoPrimeira =
        Number(
          primeira.posicao
        );

      const posicaoSegunda =
        Number(
          segunda.posicao
        );

      const primeiraTemPosicao =
        Number.isFinite(
          posicaoPrimeira
        );

      const segundaTemPosicao =
        Number.isFinite(
          posicaoSegunda
        );

      if (
        primeiraTemPosicao &&
        segundaTemPosicao &&
        posicaoPrimeira !==
          posicaoSegunda
      ) {
        return (
          posicaoPrimeira -
          posicaoSegunda
        );
      }

      return String(
        primeira.nome || ""
      ).localeCompare(
        String(
          segunda.nome || ""
        ),
        "pt-BR"
      );
    }
  );
}