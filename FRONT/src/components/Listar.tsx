import { useCallback, useEffect, useState } from "react";
import Livro from "./Livro";
import { deleteBook, getBooks } from "../services/api";
import { Book } from "../types/book";


const style = {
    bgGradiente: "bg-linear-to-bl from-violet-800 to-fuchsia-800",
    h1: "",
};

type ListarProps = {
    setAbas: (value: { aba: string; parametro?: Book }) => void;
    notify?: (message: string) => void;
};

export default function Listar({setAbas, notify}: ListarProps) {

    const [Livros, setLivros] = useState<Book[]>([]);

    const [disponivel, setDisponivel] = useState(false);

    const fetchLivros = useCallback(async (availableOnly?: boolean) => {
        const response = await getBooks(availableOnly);
        
        if (response.length === 0) {
            notify?.("Nenhum livro encontrado");
            setLivros([]);
            return;
        }
        
        setLivros(response);
    }, [notify]);

    useEffect(() => {
        fetchLivros(disponivel);
    }, [disponivel, fetchLivros]); // Atualiza sempre que 'disponivel' mudar

    const handleDelete = async (id: string) => {
        await deleteBook(id);
        fetchLivros();
    }

    const handleEdit = async (livro: Book) => {
        setAbas({aba: "editar", parametro: livro});
    }

    return (
        <div
            className={
                "flex flex-col items-center justify-center lg:mt-10 mt-5 lg:w-1/3 w-full m-auto rounded-2xl p-3 lg:gap-6 gap-4" +
                " " +
                style.bgGradiente
            }
        >
            <h2 className="text-white font-bold lg:text-2xl text-lg">
                Listar Livros
            </h2>
            <div className="flex items-center justify-center gap-2">
                <label className="text-white font-bold lg:text-base text-sm">
                    Somente os disponiveis?
                </label>
                <input
                    type="checkbox"
                    className="cursor-pointer min-w-5 min-h-5  rounded-2xl"
                    checked={disponivel} // Bind the state value
                    onChange={(e) => {
                        const value = e.target.checked;
                        setDisponivel(value);
                    }}
                />
            </div>
            <div className="flex flex-col gap-4 w-full h-80 lg:h-[35rem] overflow-y-auto">
                {Livros.map((livro) => {
                    return (
                        <Livro
                            key={livro.id}
                            livro={livro}
                            onDelete={() => handleDelete(livro.id)}
                            onEdit={() => handleEdit(livro)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
