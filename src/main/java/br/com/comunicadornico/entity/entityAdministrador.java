package br.com.comunicadornico.entity;

// imports
import java.time.LocalDate;
import jakarta.persistence.*;
import java.util.List;
import lombok.*;


@Entity
@Table(name = "tb_administrador")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

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

    @Column(name= "valorMensalidade")
    private LocalDate dataAssinatura;


                    // Relacionamento das tabelas
    //criando relação biderecional administrador x usuário (1..*)
    @OneToMany(mappedBy = "administrador") // informa que a classe que irá guardar a chave estrangeira de relação é a calsse Usuario
    private List<entityUsuario> usuarios; //cria o objeto usuário para armazenar

    //criando relação biderecional administrador x  botao (1..*)'
    @OneToMany(mappedBy = "administrador")
    private List<entityBotao> botoes;

    //criando relaçao bideracional administrador x categoria (1..*)
    @OneToMany(mappedBy = "administrador")
    private List<entityCategoria> categorias;

    //criando relaçao administrador x BackUpManager (1..1)
    @OneToOne(mappedBy = "administrador")
    private entityBackUpManager backUpManager;

}
