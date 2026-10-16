package br.com.comunicadornico.entity;

// import
import java.time.LocalDate;
import jakarta.persistence.*;
import java.util.List;
import lombok.*;


@Entity
@Table(name = "tb_usuario")
@Getter
@Setter
@NoArgsConstructor // o construtor vazio que o jpa exige
@AllArgsConstructor  // o construtor com todos os atributos

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

    //relaciomaneto bideracional de usuário x botão (1..*)
    @OneToMany(mappedBy = "usuario")
    private List<entityBotao> botoes;

    //relacionamento usuario x tira de setença (1..1)
    @OneToOne(mappedBy = "usuario")
    private entityTiraDeSentenca tiraDeSentenca;

}
