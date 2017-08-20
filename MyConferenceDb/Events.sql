CREATE TABLE [dbo].[Events]
(
	[Id] INT IDENTITY PRIMARY KEY, 
    [Name] NVARCHAR(MAX) NOT NULL, 
    [Date] DATE NOT NULL, 
    [StartTime] DATETIME NOT NULL, 
    [EndTime] DATETIME NOT NULL, 
    [Speaker] NVARCHAR(50) NULL, 
    [Topic] NVARCHAR(MAX) NULL, 
    [Chair] NVARCHAR(50) NULL, 
    [Location] NVARCHAR(50) NULL, 
    [Type] SMALLINT NULL
)
