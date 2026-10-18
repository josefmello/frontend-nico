package br.com.comunicadornico.entity;

// imports
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

//criando tabela
@Entity
@Table(name = "tb_administrador")
public class entityAdministrador {

    //criando chave primária
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long idAdministrador;

  //variaveis(colunas na tabela)
    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name= "pin", nullable = false)
    private int pin;

    @Column(name= "telefone", nullable = false, unique = true)
    private String telefone;

    @Column(name= "dataNasc", nullable = false)
    private LocalDate dataNasc;

    @Column(name= "sexo", nullable = false)
    private String sexo;

    @Column(name= "senha", nullable= false)
    private String senha;

    @Column(name= "premium")
    private boolean premium;

    @Column(name= "valorMensalidade")
    private float valorMensalidade;

    // CORRIGIDO: antes estava com o mesmo nome "valorMensalidade" (coluna repetida causava erro no Hibernate)
    @Column(name= "dataAssinatura")
    private LocalDate dataAssinatura;

    // relacionamento das tabelas
    //criando relação biderecional administrador x usuário (1..*)
    @OneToMany(mappedBy = "administrador") // informa que a classe que irá guardar a chave estrangeira de relação é a calsse Usuario
    private List<entityUsuario> usuarios; //cria o objeto usuário para armazenar

    //criando relação biderecional administrador x  botao (1..*)
    @OneToMany(mappedBy = "administrador")
    private List<entityBotao> botoes;

    //criando relaçao bideracional administrador x categoria (1..*)
    @OneToMany(mappedBy = "administrador")
    private List<entityCategoria> categorias;

    //criando relaçao  administrador x BackUpManager (1..1)
    @OneToOne(mappedBy = "administrador")
    private entityBackUpManager backUpManager;

    //getters, setters e construtores
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

    // ADICIONADO: getters e setters dos relacionamentos
    public List<entityUsuario> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(List<entityUsuario> usuarios) {
        this.usuarios = usuarios;
    }

    public List<entityBotao> getBotoes() {
        return botoes;
    }

    public void setBotoes(List<entityBotao> botoes) {
        this.botoes = botoes;
    }

    public List<entityCategoria> getCategorias() {
        return categorias;
    }

    public void setCategorias(List<entityCategoria> categorias) {
        this.categorias = categorias;
    }

    public entityBackUpManager getBackUpManager() {
        return backUpManager;
    }

    public void setBackUpManager(entityBackUpManager backUpManager) {
        this.backUpManager = backUpManager;
    }
}