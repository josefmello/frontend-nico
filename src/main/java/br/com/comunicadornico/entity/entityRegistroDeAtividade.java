package br.com.comunicadornico.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_registrodeatividade")
public class entityRegistroDeAtividade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRegistro;

    // variaveis
    private LocalDate dataHora;
    private int quantidadeCliques;

    // Relação Muitos para Um com a tabela Usuário (Um usuário gera 1 ou muitos
    // registros de atividade)
    @ManyToOne
    @JoinColumn(name = "idUsuario") // cria a chave estrangeira apontando para o usuario que gerou a atividade
    private List<entityUsuario> usuario;

 // construtor padrao (exigido pelo JPA)
    public entityRegistroDeAtividade() {
    }
 
    // construtor com todos os atributos (exceto o id, gerado pelo banco)
    public entityRegistroDeAtividade(LocalDate dataHora, int quantidadeCliques, List<entityUsuario> usuario) {
        this.dataHora = dataHora;
        this.quantidadeCliques = quantidadeCliques;
        this.usuario = usuario;
    }
 
    public Long getIdRegistro() {
        return idRegistro;
    }
 
    public void setIdRegistro(Long idRegistro) {
        this.idRegistro = idRegistro;
    }
 
    public LocalDate getDataHora() {
        return dataHora;
    }
 
    public void setDataHora(LocalDate dataHora) {
        this.dataHora = dataHora;
    }
 
    public int getQuantidadeCliques() {
        return quantidadeCliques;
    }
 
    public void setQuantidadeCliques(int quantidadeCliques) {
        this.quantidadeCliques = quantidadeCliques;
    }
 
    public List<entityUsuario> getUsuario() {
        return usuario;
    }
 
    public void setUsuario(List<entityUsuario> usuario) {
        this.usuario = usuario;
    }
}
 
