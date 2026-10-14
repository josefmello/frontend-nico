package br.com.comunicadornico.entity;

import java.util.List;

import jakarta.persistence.Entity; //import para usar a lista
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity 
@Table(name = "tb_tiradesentenca")
public class entityTiraDeSentenca {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long idTiraDeSentenca;

    private List SequenciaDeBotoes;
}
