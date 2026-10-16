package br.com.comunicadornico.entity;

//imports
import java.util.ArrayList; //tradutor do sql
import java.util.List;

import jakarta.persistence.*;
import lombok.*;

//criando a tabela
@Entity
@Table(name = "tb_categoria")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class entityCategoria {

    @Id //cria a chave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategoria;

    //criando as variaveis
    @Column(name= "nome", nullable = false) //avisa o banco de dados que essa coluna não pode ficar vazia
    private String nome;

    @Column(name= "ordemBotao")
    private List<String> ordemBotao = new ArrayList<>();

    @Column(name= "fotoCat")
    private String fotoCat;

    @Column(name= "posicaoCat")
    private int posicaoCat;

    // criando as relaçoes
    // relaçao categoria x administrador (*..1)
    @ManyToOne
    @JoinColumn(name = "fkAdministrador")
    private entityAdministrador administrador;

    // relaçao categoria x usuario (*..1)
    @ManyToOne
    @JoinColumn(name = "fkUsuario")
    private entityUsuario usuario;
}
