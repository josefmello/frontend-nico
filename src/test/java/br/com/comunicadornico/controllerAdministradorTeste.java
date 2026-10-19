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

import br.com.comunicadornico.controller.controllerAdministrador;

@WebMvcTest(controllerAdministrador.class)
public class controllerAdministradorTeste {

    @Autowired
    private MockMvc mockMvc;

    // 1. Testar Listar Todos (GET)
    @Test
    public void deveRetornarOkAoListarAdministrador() throws Exception {
        mockMvc.perform(get("/api/administradores"))
                .andExpect(status().isOk());
    }

    // 2. Testar Buscar por Nome (GET)
    @Test
    public void deveRetornarOkAoBuscarAdministradorPorNome() throws Exception {
        mockMvc.perform(get("/api/administradores/buscar?nome=Filipe"))
                .andExpect(status().isOk());
    }

    // 3. Testar Criar (POST)
    @Test
    public void deveRetornarCreatedAoCriarAdministrador() throws Exception {
        mockMvc.perform(post("/api/administradores")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nome\": \"Novo Administrador\"}"))
                .andExpect(status().isCreated()); // Espera 201 CREATED
    }

    // 4. Testar Atualizar (PUT)
    @Test
    public void deveRetornarOkAoAtualizarAdministrador() throws Exception {
        mockMvc.perform(put("/api/administradores/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nome\": \"Administrador Atualizado\"}"))
                .andExpect(status().isOk());
    }

    // 5. Testar Deletar (DELETE)
    @Test
    public void deveRetornarNoContentAoDeletarAdministrador() throws Exception {
        mockMvc.perform(delete("/api/administradores/1"))
                .andExpect(status().isNoContent());
    }
}
