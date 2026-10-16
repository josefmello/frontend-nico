package br.com.comunicadornico.entity;

//imports
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_backupmanager")

public class entityBackUpManager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long idBackUp;

    //variaveis
    private String caminhoBackUp;
    private LocalDate dataUltimoBackUp;

    // criando os relacionamentos da tabela
    // relacionamento BackUpManager x Administrador (1..1)
    @OneToOne
    @JoinColumn(name = "fkAdministrador")
    private entityAdministrador administrador;


}
