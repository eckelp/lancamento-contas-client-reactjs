import React, {useEffect, useState} from "react";
import CategoriaForm from "./form/CategoriaForm";
import CategoriaLista from "./lista/CategoriaLista";
import CategoriaService from "./CategoriaService";
import Mensagens from "../../shared/mensagens/Mensagens";


const Categorias = () => {
    const [categoria, setCategoria] = useState({});
    const [categorias, setCategorias] = useState([]);

    const categoriaService = new CategoriaService();

    const handlersForm = {
        salvar: async (categoria) => {
            const response = await categoriaService.salvar(categoria)
            if(response && response.status && (response.status === 200 || response.status === 201)){
                Mensagens.sucesso("Yes! Categoria salva com sucesso!")
            }else{
                Mensagens.erro("Ops! Não conseguimos salvar a categoria!")
            }
            buscarCategorias();
        },
        limparFormulario: () => setCategoria(null)
    }

    const handlersLista = {
        editar: (categoria) => {
           setCategoria(categoria);
        },
        remover: async (id) => {
            const response = await categoriaService.remover(id);

            if(response && response.status && response.status === 200){
                Mensagens.sucesso("Yes! Categoria removida com sucesso!")
                handlersForm.limparFormulario();
            }else{
                Mensagens.erro("Ops! Não conseguimos remover a categoria!")
            }

            buscarCategorias();
        }
    }

    const buscarCategorias = async () => {
        const categoriaService = new CategoriaService();

        const response = await categoriaService.buscarCategorias();
        setCategorias(response.data);
    }

    useEffect(() => { buscarCategorias() }, []);


    return (
        <>
            <CategoriaForm handlers={handlersForm} categoria={categoria} />
            <CategoriaLista handlers={handlersLista} categorias={categorias}/>
        </>
    );


}

export default Categorias;
