package br.com.comunicadornico;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import br.com.comunicadornico.controller.controllerCategoria;

@WebMvcTest(controllerCategoria.class)
public class controllerCategoriaTeste {

    @Autowired
    private MockMvc mockMvc;

    // 1. Testar Listar Todos (GET)
    @Test
    public void deveRetornarOkAoListarCategorias() throws Exception {
        mockMvc.perform(get("/api/categorias"))
                .andExpect(status().isOk()); // Espera 200 OK
    }

    // 2. Testar Buscar por Nome (GET)
    @Test
    public void deveRetornarOkAoBuscarCategoriaPorNome() throws Exception {
        mockMvc.perform(get("/api/categorias/buscar?nome=Favoritos"))
                .andExpect(status().isOk());
    }

    // 3. Testar Criar (POST)
    @Test
    public void deveRetornarCreatedAoCriarCategoria() throws Exception {
        mockMvc.perform(post("/api/categorias")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nome\": \"Nova Categoria\"}"))
                .andExpect(status().isCreated()); // Espera 201 CREATED
    }

    // 4. Testar Atualizar (PUT)
    @Test
    public void deveRetornarOkAoAtualizarCategoria() throws Exception {
        mockMvc.perform(put("/api/categorias/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nome\": \"Categoria Atualizada\"}"))
                .andExpect(status().isOk()); 
    }

    // 5. Testar Deletar (DELETE)
    @Test
    public void deveRetornarNoContentAoDeletarCategoria() throws Exception {
        mockMvc.perform(delete("/api/categorias/1"))
                .andExpect(status().isNoContent());
    }
}
