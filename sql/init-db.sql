USE [master];
GO

CREATE DATABASE [DemoSession];
GO

USE [DemoSession];
GO

CREATE TABLE [Member] (
    [MemberId] BIGINT IDENTITY,
    [Email] VARCHAR(250),
    [Password] CHAR(60),
    CONSTRAINT PK_Member PRIMARY KEY ([MemberId]),
    CONSTRAINT UK_Member__Email UNIQUE ([Email])
);
GO

ALTER TABLE Member
 ADD Pseudo VARCHAR(50) NOT NULL
	 CONSTRAINT UK_Member__Pseudo UNIQUE;