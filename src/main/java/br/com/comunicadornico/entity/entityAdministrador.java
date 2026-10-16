package br.com.comunicadornico.entity;
// imports

import java.util.List;
// imports jakarta
import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;

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

    // relacionamento das tabelas
    //criando relação biderecional administrador x usuário (1..*)
    @OneToMany(mappedBy = "administrador", cascade = CascadeType.ALL, orphanRemoval = true) // informa que a classe que irá guardar a chave estrangeira de relação é a calsse Usuario
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

}
