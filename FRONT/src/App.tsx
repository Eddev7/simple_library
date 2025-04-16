import FormCadastro from "./components/FormCadastro";
import { useState } from "react";
import Menu from "./components/Menu";
import Header from "./components/Header";
import Listar from "./components/Listar";
import FormEdit from "./components/FormEdit";
import { Book } from "./types/book";
import { ToastContainer, toast } from 'react-toastify';

const style = {
    background:
        "bg-[url('/background.svg')] bg-repeat bg-center h-screen lg:w-screen flex-col justify-center p-2 lg:p-10 overflow-hidden",
};
type abas = {
    aba: string;
    parametro?: Book;
}

function App() {
    const [abas, setAbas] = useState<abas>({aba:"cadastrar"});

    const notify = (message: string) => toast(message);

    return (
        <div className={style.background}>
            <Header />

            <Menu setAbas={setAbas} />

            {abas.aba === "cadastrar" && <FormCadastro notify={notify} setAbas={setAbas} />}
            {abas.aba === "listar" && <Listar notify={notify} setAbas={setAbas}/>}
            {abas.aba === 'editar' && abas.parametro && <FormEdit notify={notify} livro={abas.parametro} setAbas={setAbas} />}
            <ToastContainer/>
        </div>
    );
}

export default App;
