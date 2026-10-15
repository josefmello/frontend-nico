package br.com.comunicadornico.entity;
// import

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_usuario")
public class entityUsuario {

    // criando a chave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    //variaveis
    private String nome;
    private String sexo;
    private String nivelAutismo;
    private LocalDate dataNascAut;
    private boolean voz;

    // Construtor padrão (exigido pelo JPA)
    public entityUsuario() {
    }
 
    // Construtor com todos os atributos (exceto o id, gerado pelo banco)
    public entityUsuario(String nome, String sexo, String nivelAutismo, LocalDate dataNascAut, boolean voz) {
        this.nome = nome;
        this.sexo = sexo;
        this.nivelAutismo = nivelAutismo;
        this.dataNascAut = dataNascAut;
        this.voz = voz;
    }
 
    public Long getIdUsuario() {
        return idUsuario;
    }
 
    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }
 
    public String getNome() {
        return nome;
    }
 
    public void setNome(String nome) {
        this.nome = nome;
    }
 
    public String getSexo() {
        return sexo;
    }
 
    public void setSexo(String sexo) {
        this.sexo = sexo;
    }
 
    public String getNivelAutismo() {
        return nivelAutismo;
    }
 
    public void setNivelAutismo(String nivelAutismo) {
        this.nivelAutismo = nivelAutismo;
    }
 
    public LocalDate getDataNascAut() {
        return dataNascAut;
    }
 
    public void setDataNascAut(LocalDate dataNascAut) {
        this.dataNascAut = dataNascAut;
    }
 
    public boolean isVoz() {
        return voz;
    }
 
    public void setVoz(boolean voz) {
        this.voz = voz;
    }
}
 
