import { FaTrash } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { Book } from "../types/book";

type LivroProps = {
    livro: Book;
    onDelete?: (id: string) => void;
    onEdit?: (livro: Book) => void;
};

export default function Livro({ livro, onDelete, onEdit }: LivroProps) {
    return (
        <div className="flex bg-white p-4 rounded-lg shadow-md mr-2">
            <div className="lg:grid lg:grid-cols-2 flex flex-col w-full">
                <p>
                    <strong>Titulo:</strong> {livro.titulo}
                </p>
                <p>
                    <strong>Autor:</strong> {livro.autor}
                </p>
                <p>
                    <strong>Ano:</strong> {livro.anoPublicacao}
                </p>
                <p>
                    <strong>codigo:</strong> {livro.codigo}
                </p>
            </div>
            <div className="flex flex-col h-full gap-4 items-center justify-center lg:mr-5">
                <button onClick={() => onDelete?.(livro.id)}>
                    <FaTrash
                        size={24}
                        color="#FF0000"
                        className="cursor-pointer hover:animate-bounce"
                    />
                </button>
                <button onClick={() => onEdit?.(livro)}>
                    <MdEditDocument
                        size={24}
                        color="#1976D2"
                        className="cursor-pointer hover:animate-bounce"
                    />
                </button>
            </div>
        </div>
    );
}
