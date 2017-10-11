CREATE TABLE [dbo].[UserEvents]
(
	[Id] INT IDENTITY PRIMARY KEY, 
    [UserId] INT NOT NULL, 
    [EventId] INT NOT NULL, 
    CONSTRAINT [FK_UserEvents_ToUsers] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]), 
    CONSTRAINT [FK_UserEvents_ToEvents] FOREIGN KEY ([EventId]) REFERENCES [Events]([Id])
)
