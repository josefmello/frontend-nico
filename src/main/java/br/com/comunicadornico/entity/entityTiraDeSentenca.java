package br.com.comunicadornico.entity;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "tb_tiradesentenca")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class entityTiraDeSentenca {

    // criar chave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTiraDeSentenca;

    // variaveis
    @Column
    private List<Integer> sequenciaBotoes = new ArrayList<>();

    @Column
    private String textoFormatado;

    @Column
    private List<Integer> sugestao = new ArrayList<>();

    //criando relacionamento das tabelas
    //relação tira x usuario (1..1)
    @OneToOne
    @JoinColumn(name = "fkUsuario")
    private entityUsuario usuario;

    //relação tira x botão
    @OneToMany(mappedBy = "tiraDeSentenca")
    private List<entityBotao> botoes;

}
