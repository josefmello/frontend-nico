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

import br.com.comunicadornico.controller.controllerBotao;

@WebMvcTest(controllerBotao.class)
public class controllerBotaoTeste {

    @Autowired
    private MockMvc mockMvc;

    // 1 - Teste listar todos os registros (get)
    @Test
    public void deveRetornarOkAoListarBotoes() throws Exception {
        mockMvc.perform(get("/api/botoes"))
                .andExpect(status().isOk());
    }

    // 2. Testar Buscar por Nome (GET)
    @Test
    public void deveRetornarOkAoBuscarBotaoPorNome() throws Exception {
        mockMvc.perform(get("/api/botoes/buscar?legenda=Sim"))
                .andExpect(status().isOk());
    }

    // 3. Testar Criar (POST)
    @Test
    public void deveRetornarCreatedAoCriarBotao() throws Exception {
        mockMvc.perform(post("/api/botoes")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nome\": \"Novo Botao\"}"))
                .andExpect(status().isCreated()); // Espera 201 CREATED
    }

    // 4. Testar Atualizar (PUT)
    @Test
    public void deveRetornarOkAoAtualizarBotao() throws Exception {
        mockMvc.perform(put("/api/botoes/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nome\": \"Botão Atualizado\"}"))
                .andExpect(status().isOk());
    }
    // 5. Testar Deletar (DELETE)

    @Test
    public void deveRetornarNoContentAoDeletarBotao() throws Exception {
        mockMvc.perform(delete("/api/botoes/1"))
                .andExpect(status().isNoContent());
    }

}
