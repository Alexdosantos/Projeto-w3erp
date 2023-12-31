import * as S from "./ModalLogout.style";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type ModalLogoutProps = {
  isOpen: boolean;
};

export const ModalLogout = ({ isOpen }: ModalLogoutProps) => {
  const [, setToken] = useState<string>("");
  const navigate = useNavigate();

  const logout = async (): Promise<void> => {
    localStorage.removeItem("AUTH_TOKEN");
    setToken(" ");
    navigate("/");
  };

  if (isOpen)
    return (
      <S.Container>
        <S.Wapper>
          <S.DivConfiguration>
            <S.IconConfiguration />
            <S.TextConfiguration>Configuração</S.TextConfiguration>
          </S.DivConfiguration>
          <S.Division />
          <S.DivExit>
            <S.IconExit />
            <S.BtnExit onClick={logout}>Sair</S.BtnExit>
          </S.DivExit>
        </S.Wapper>
      </S.Container>
    );
};
