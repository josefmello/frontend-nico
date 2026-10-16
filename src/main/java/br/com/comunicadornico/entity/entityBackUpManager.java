package br.com.comunicadornico.entity;
//imports

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_backupmanager")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class entityBackUpManager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBackUp;

    // Variaveis(colunas da tabela)
    @Column(name= "caminhoBackup")
    private String caminhoBackUp;

    @Column(name= "dataUltimoBackup")
    private LocalDate dataUltimoBackUp;

    // criando os relacionamentos da tabela
    // relacionamento BackUpManager x Administrador (1..1)
    @OneToOne
    @JoinColumn(name = "fkAdministrador")
    private entityAdministrador administrador;

}
