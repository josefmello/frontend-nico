package br.com.comunicadornico.entity;
//imports

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "tb_backupmanager")
public class entityBackUpManager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBackUp;

    //variaveis
    private String caminhoBackUp;
    private LocalDate dataUltimoBackUp;

}
