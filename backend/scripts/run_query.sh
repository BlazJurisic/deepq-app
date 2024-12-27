#!/bin/bash

# PostgreSQL connection details
PGUSER="postgres"
PGPASSWORD="SifraNekaZaBazu123"
PGHOST="database-deepq-demo-1.cb6os2kiyuk4.us-east-1.rds.amazonaws.com"
PGPORT="5432"

# Export password for psql
export PGPASSWORD

# Create database and initialize schema
psql -h $PGHOST -p $PGPORT -U $PGUSER -f $1

# # Run Python initialization script
# python3 -c "
# import asyncio
# from app.db.session import SessionLocal
# from app.db.init_db import init_db

# async def init():
#     db = SessionLocal()
#     await init_db(db)
#     await db.close()

# asyncio.run(init())
# "

# echo "Database initialization completed!"
