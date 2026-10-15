package br.com.comunicadornico.entity;
// imports

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

//criando tabela
@Entity
@Table(name = "tb_administrador")
public class entityAdministrador {

    //criando chave primária
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAdministrador;

    //variaveis
    private String nome;
    private String email;
    private int pin;
    private String telefone;
    private LocalDate dataNasc;
    private String sexo;
    private String senha;
    private boolean premium;
    private float valorMensalidade;
    private LocalDate dataAssinatura;

// Construtor padrão (exigido pelo JPA)
    public entityAdministrador() {
    }
 
    // Construtor com todos os atributos (exceto o id, gerado pelo banco)
    public entityAdministrador(String nome, String email, int pin, String telefone, LocalDate dataNasc, String sexo, String senha, boolean premium, float valorMensalidade, LocalDate dataAssinatura) {
        this.nome = nome;
        this.email = email;
        this.pin = pin;
        this.telefone = telefone;
        this.dataNasc = dataNasc;
        this.sexo = sexo;
        this.senha = senha;
        this.premium = premium;
        this.valorMensalidade = valorMensalidade;
        this.dataAssinatura = dataAssinatura;
    }
 
    public Long getIdAdministrador() {
        return idAdministrador;
    }
 
    public void setIdAdministrador(Long idAdministrador) {
        this.idAdministrador = idAdministrador;
    }
 
    public String getNome() {
        return nome;
    }
 
    public void setNome(String nome) {
        this.nome = nome;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    public int getPin() {
        return pin;
    }
 
    public void setPin(int pin) {
        this.pin = pin;
    }
 
    public String getTelefone() {
        return telefone;
    }
 
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
 
    public LocalDate getDataNasc() {
        return dataNasc;
    }
 
    public void setDataNasc(LocalDate dataNasc) {
        this.dataNasc = dataNasc;
    }
 
    public String getSexo() {
        return sexo;
    }
 
    public void setSexo(String sexo) {
        this.sexo = sexo;
    }
 
    public String getSenha() {
        return senha;
    }
 
    public void setSenha(String senha) {
        this.senha = senha;
    }
 
    public boolean isPremium() {
        return premium;
    }
 
    public void setPremium(boolean premium) {
        this.premium = premium;
    }
 
    public float getValorMensalidade() {
        return valorMensalidade;
    }
 
    public void setValorMensalidade(float valorMensalidade) {
        this.valorMensalidade = valorMensalidade;
    }
 
    public LocalDate getDataAssinatura() {
        return dataAssinatura;
    }
 
    public void setDataAssinatura(LocalDate dataAssinatura) {
        this.dataAssinatura = dataAssinatura;
    }
}
 