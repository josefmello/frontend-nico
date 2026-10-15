package br.com.comunicadornico.entity;
//imports

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tb_backupmanager")
public class entityBackUpManager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter 
    @Setter 
    @NoArgsConstructor
    @AllArgsConstructor 
    
    private Long idBackUp;

    //variaveis
    private String caminhoBackUp;
    private LocalDate dataUltimoBackUp;

   
}
 











