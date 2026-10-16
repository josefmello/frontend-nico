package br.com.comunicadornico.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
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
    @Column(name= "dataHora")
    private LocalDate dataHora;

    @Column(name= "quantidadeCliques")
    private int quantidadeCliques;

    //criando as relações das tabelas:
    // realação RegistroXBotão, essa é uma relacão bidirecional, ou seja, a classe registro sabe qual botão ela pertence
    @ManyToOne // Muitos para um
    @JoinColumn(name = "fkBotao") // Cria a coluna na tabela de registros para guardar quem foi o botão clicado
    private entityBotao botao;

    // relação registroxusuario (*..1)
    @ManyToOne
    @JoinColumn(name = "fkUsuario")
    private entityUsuario usuario;

}
