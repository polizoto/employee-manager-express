 IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'organization')
  BEGIN
    CREATE DATABASE [organization]


    END
    GO
       USE [organization]
    GO