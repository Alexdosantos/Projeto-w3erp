import { useState } from "react";
import { DashbordData } from "../../Components/DashboardData/DashbordData";
import { Layout } from "../../Components/Layout/Layout";
import * as S from "./Dashboard.Style";
import TabelaProducts from "../../Components/TableDasboard/TableProducts";
import { ToggerTable } from "../../Components/NavTable/ToggerTable";
import ImgProducts from "../../assets/Icons/IconBlue.png";
import ImgClients from "../../assets/Icons/IconClients.png";
import ImgNext from "../../assets/Icons/right.svg";
import { GetUser } from "../../Service/GetApi/GetUser";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import TourComponent from "../../Tour/TourDashboard";

type DashProps = {
  classificacao: string;
  id: number;
  nome: string;
  percentual: number;
};

const Dashboard = () => {
  const [exibirProdutosAlta, setExibirProdutosAlta] = useState(true);
  const [exibirProdutosBaixa, setExibirProdutosBaixa] = useState(false);
  const [exibirClientesAlta, setExibirClientesAlta] = useState(true);
  const [exibirClientesBaixa, setExibirClientesBaixa] = useState(false);

  const { data: produtos } = useQuery("produtos", GetUser.produtos);
  const { data: clientes } = useQuery("clients", GetUser.cliente);

  const produtosData = exibirProdutosAlta
    ? produtos &&
      produtos.filter(
        ({ classificacao }: DashProps) => classificacao === "EM_ALTA"
      )
    : exibirProdutosBaixa
    ? produtos.filter(
        ({ classificacao }: DashProps) => classificacao === "EM_BAIXA"
      )
    : produtos;

  const clientesData = exibirClientesAlta
    ? clientes &&
      clientes.filter(
        ({ classificacao }: DashProps) => classificacao === "EM_ALTA"
      )
    : exibirClientesBaixa
    ? clientes.filter(
        ({ classificacao }: DashProps) => classificacao === "EM_BAIXA"
      )
    : clientes;

  return (
    <>
      <Layout>
        <TourComponent />
        <DashbordData />

        <S.DivTable>
          <TabelaProducts
            nav={
              <ToggerTable
                img={ImgProducts}
                title="Produtos"
                onClickAlta={() => {
                  setExibirProdutosAlta(true);
                  setExibirProdutosBaixa(false);
                }}
                onClickBaixa={() => {
                  setExibirProdutosAlta(false);
                  setExibirProdutosBaixa(true);
                }}
              />
            }
            id="ID"
            dados={
              produtosData &&
              produtosData.map(
                (item: { id: number; nome: string; percentual: number }) => ({
                  id: item.id,
                  nome: item.nome,
                  imagemProdutos: (
                    <Link to={`/Produtos/detalhes/produtos/${item.id}`}>
                      <img src={ImgNext} alt="next" />
                    </Link>
                  ),
                  percentual: item.percentual,
                })
              )
            }
          />
          <div></div>
          <TabelaProducts
            nav={
              <ToggerTable
                img={ImgClients}
                title="Clientes"
                onClickAlta={() => {
                  setExibirClientesAlta(true);
                  setExibirClientesBaixa(false);
                }}
                onClickBaixa={() => {
                  setExibirClientesAlta(false);
                  setExibirClientesBaixa(true);
                }}
              />
            }
            id="ID"
            dados={
              clientesData &&
              clientesData.map(
                (item: { id: number; nome: string; percentual: number }) => ({
                  id: item.id,
                  cliente: item.nome,
                  imagemClientes: (
                    <Link to={`/Produtos/detalhes/clientes/${item.id}`}>
                      <img src={ImgNext} alt="next" />
                    </Link>
                  ),
                  percentual: item.percentual,
                })
              )
            }
          />
        </S.DivTable>
      </Layout>
    </>
  );
};

export default Dashboard;
