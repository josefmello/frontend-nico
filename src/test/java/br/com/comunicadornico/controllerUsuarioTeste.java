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

import br.com.comunicadornico.controller.controllerUsuario;

@WebMvcTest(controllerUsuario.class)
public class controllerUsuarioTeste {

    @Autowired
    private MockMvc mockMvc;

    // 1. Testar Listar Todos (GET)
    @Test
    public void deveRetornarOkAoListarUsuario() throws Exception {
        mockMvc.perform(get("/api/usuarios"))
                .andExpect(status().isOk()); // Espera 200 OK
    }

    // 2. Testar Buscar por Nome (GET)
    @Test
    public void deveRetornarOkAoBuscarUsuarioPorNome() throws Exception {
        mockMvc.perform(get("/api/usuarios/buscar?nome=Filipe"))
                .andExpect(status().isOk());
    }

    // 3. Testar Criar (POST)
    @Test
    public void deveRetornarCreatedAoCriarUsuario() throws Exception {
        mockMvc.perform(post("/api/usuarios")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nome\": \"Novo Usuario\"}"))
                .andExpect(status().isCreated()); // Espera 201 CREATED
    }

    // 4. Testar Atualizar (PUT)
    @Test
    public void deveRetornarOkAoAtualizarUsuarios() throws Exception {
        mockMvc.perform(put("/api/usuarios/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nome\": \"Usuario Atualizado\"}"))
                .andExpect(status().isOk()); 
    }

    // 5. Testar Deletar (DELETE)
    @Test
    public void deveRetornarNoContentAoDeletarUsuario() throws Exception {
        mockMvc.perform(delete("/api/usuarios/1"))
                .andExpect(status().isNoContent());
    }
}
