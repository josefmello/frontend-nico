package br.com.comunicadornico.entity;

// import
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@Entity
@Table(name = "tb_usuario")

public class entityUsuario {

    // criando a chave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    // colunas
    @Column(name= "nome", nullable = false)
    private String nome;

    @Column(name= "sexo")
    private String sexo;

    @Column(name= "nivelAutismo")
    private String nivelAutismo;

    @Column(name= "dataNascAut", nullable = false)
    private LocalDate dataNascAut;

    @Column(name= "voz")
    private boolean voz;
    
    // criando os relacionamentos da tabela
    // relacioamento bidirecional de usuárioxadministrador (*..1)
    @ManyToOne
    @JoinColumn(name = "fkAdministrador") // criando a coluna que irá armazenar a chave estrangeira
    private entityAdministrador administrador; // cria o objeto administrador que será armazenado

    //relacionamento bidirecional de usuário x registrodeatividade (1...*)
    @OneToMany(mappedBy = "usuario")
    private List<entityRegistroDeAtividade> registros;

    //relaciomaneto bideracional de usuário x categoria (1..*)
    @OneToMany(mappedBy = "usuario")
    private List<entityCategoria> categorias;

    // relaciomaneto bideracional de usuário x botão (1..*)
    @OneToMany(mappedBy = "usuario")
    private List<entityBotao> botoes;

    //relacionamento usuario x tira de setença (1..1)
    @OneToOne(mappedBy = "usuario")
    private entityTiraDeSentenca tiraDeSentenca;

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

