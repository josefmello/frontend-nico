package br.com.comunicadornico.entity;

// import
import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

<<<<<<< HEAD
import java.util.List;
=======
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

>>>>>>> 4ff495c777d5e50fa30f75a0145fed1b26779d67

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

    //variaveis
    private String nome;
    private String sexo;
    private String nivelAutismo;
    private LocalDate dataNascAut;
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

}
