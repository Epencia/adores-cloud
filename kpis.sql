-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 26 nov. 2025 à 22:15
-- Version du serveur : 8.2.0
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `rouah`
--

-- --------------------------------------------------------

--
-- Structure de la table `kpis`
--

DROP TABLE IF EXISTS `kpis`;
CREATE TABLE IF NOT EXISTS `kpis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `nom` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `formule` text COLLATE utf8mb4_general_ci NOT NULL,
  `format_affichage` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '#,##0.00',
  `unite` varchar(20) COLLATE utf8mb4_general_ci DEFAULT '€',
  `base_donnees_code` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `filtre_json` json DEFAULT NULL,
  `seuils_couleur` json DEFAULT NULL,
  `actif` tinyint(1) DEFAULT '1',
  `cree_par` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_creation` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `kpis`
--

INSERT INTO `kpis` (`id`, `code`, `nom`, `formule`, `format_affichage`, `unite`, `base_donnees_code`, `filtre_json`, `seuils_couleur`, `actif`, `cree_par`, `date_creation`) VALUES
(3, 'KPI0001', 'Affichage des stagiaires par filiere', 'COUNT(code_stagiaire) GROUP BY filiere', '#,##0.00', '', 'TBL_69123244304fe', NULL, NULL, 1, '123456', '2025-11-20 20:07:57'),
(5, 'KPI0002', 'Affichage des stagiaires par filiere', 'SELECT COUNT(code_stagiaire) GROUP BY filiere', '#,##0.00', '€', 'TBL_69123244304fe', NULL, NULL, 1, '123456', '2025-11-20 20:23:52'),
(6, 'sgh', 'Affichage des stagiaires par filiere', 'SELECT COUNT(id_annonce)', '#,##0.00', '€', 'TBL_69120af8c9c56', NULL, NULL, 1, '123456', '2025-11-21 12:43:25');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
