import * as React from "react";
import * as S from "./Products.Style";
import { Layout } from "../../Components/Layout/Layout";
import { Search } from "../../Components/Search/Search";
import { useQuery } from "react-query";
import { GetUser } from "../../Service/GetApi/GetUser";
import Filter from "../../assets/Icons/Filter.png";
import TabelaProducts from "../../Components/TableDasboard/TableProducts";
import { useEffect } from "react";
import { SmallModalProducts } from "../../Components/SmallModalProducts/SmallModalProducts";
import { Pagination } from "@mui/material";

const Produtos = () => {
  const [page, setPage] = React.useState<number>(1);
  const [total, setTotal] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [openModal, setOpenModal] = React.useState(false);
  const [classificacao, setClassificacao] = React.useState<string | null>(null);
  const [filterProducts, setFilterProducts] = React.useState<[]>([]);

  const size = 10;

  const { data } = useQuery(
    ["ProdutoList", searchTerm, page],
    () => GetUser.produtosList(searchTerm, page, size),
    {
      staleTime: 10000,
    }
  );

  const List = data?.content;

  const applyFilter = React.useCallback(() => {
    if (classificacao === "EM_ALTA" || classificacao === "EM_BAIXA") {
      const filteredList = data?.content.filter(
        (item: { classificacao: string }) =>
          item.classificacao === classificacao
      );
      setFilterProducts(filteredList || []);
    } else {
      setFilterProducts(data?.content || []);
    }
  }, [classificacao, data]);

  useEffect(() => {
    GetUser.produtosList(searchTerm, page, size);
    if (data) {
      setTotal(data.totalPages);
      applyFilter();
    }
  }, [searchTerm, page, data, applyFilter]);

  const handleSearch = (event: {
    key: string;
    target: { value: React.SetStateAction<string> };
  }) => {
    if (event.key === "Enter") {
      setSearchTerm(event.target.value);
    }
  };

  const handleButtonApply = () => {
    applyFilter();
    setOpenModal(false);
  };

  const handleCheckedTodos = () => {
    setClassificacao(null);
  };
  const filter = filterProducts.length > 0 ? filterProducts : List || [];

  return (
    <>
      <Layout>
        <S.TitleH1>Produtos</S.TitleH1>
        <S.Wapper>
          <Search
            placeholder="Pesquise uma palavra-chave"
            onKeyDown={handleSearch}
          />
          <S.ButtonFilter onClick={() => setOpenModal(!openModal)}>
            <img src={Filter} alt="" />
          </S.ButtonFilter>
          <SmallModalProducts
            isOpen={openModal}
            emAlta={() => {
              setClassificacao("EM_ALTA");
            }}
            emBaixa={() => {
              setClassificacao("EM_BAIXA");
            }}
            todos={handleCheckedTodos}
            buttonAplication={handleButtonApply}
            checkedTodos={classificacao === null}
            checkedAlta={classificacao === "EM_ALTA"}
            checkedBaixa={classificacao === "EM_BAIXA"}
          />
        </S.Wapper>
        <S.DivTable>
          <TabelaProducts
            nav=""
            id="ID"
            dados={filter.map(
              (item: {
                id: number;
                classificacao: number;
                nome: string;
                percentual: number;
              }) => ({
                id: item.id,
                classificacao: item.classificacao,
                nome: (
                  <S.LinkProdutos to={`/Produtos/detalhes/produtos/${item.id}`}>
                    {item.nome}
                  </S.LinkProdutos>
                ),
                percentual: item.percentual,
              })
            )}
          />
        </S.DivTable>

        <S.DivPages>
          <S.TextPages>
            {page} de {total} itens
          </S.TextPages>
          <S.DivButton>
            <Pagination
              page={page}
              count={total}
              shape="rounded"
              onChange={(_, newPage) => setPage(newPage)}
            />
          </S.DivButton>
        </S.DivPages>
      </Layout>
    </>
  );
};

export default Produtos;
