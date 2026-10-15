package br.com.comunicadornico.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//criando tabela
//anotacoes
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
    private List<Integer> sequenciaBotoes = new ArrayList<>();
    private String textoFormatado;
    private List<Integer> sugestao = new ArrayList<>();
}
    